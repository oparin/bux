<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/18/15
 * Time: 5:33 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\Video;

use Bux\Admin\AdvertisementsBundle\Form\Type\AdMembershipFormType;
use Bux\AdvertiseBundle\Form\Type\AdCountryFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewAdFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\Video
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
            ->add('description', 'text', array(
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
            ->add('value', 'entity', array(
                'class' => 'BuxAdminAdvertisementsBundle:VideoCategories',
                'property'  => 'value'
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
            'data_class' => 'Bux\AdvertiseBundle\Entity\VideoAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_video_ad_form_type';
    }
}