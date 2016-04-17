<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/16/15
 * Time: 4:56 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf;

use Bux\Admin\AdvertisementsBundle\Form\Type\AdMembershipFormType;
use Bux\AdvertiseBundle\Form\Type\AdCountryFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
/**
 * Class NewAdFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf
 */
class NewAdFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('targetUrl', 'url', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('credits', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('maxClickInDay', 'integer', array(
            ))
            ->add('category', 'entity', array(
                'class' => 'BuxAdminAdvertisementsBundle:AutoSerfCategories',
                'property'  => 'seconds'
            ))
            ->add('memberships', new AdMembershipFormType(), array(

            ))
            ->add('countries', new AdCountryFormType(), array(
                'required'  => false
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\AdvertiseBundle\Entity\AutoSerfAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_auto_serf_ad_form_type';
    }
}