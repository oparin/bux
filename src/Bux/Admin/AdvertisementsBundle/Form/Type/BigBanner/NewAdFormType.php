<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 3:54 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\BigBanner;

use Bux\Admin\AdvertisementsBundle\Form\Type\AdMembershipFormType;
use Bux\AdvertiseBundle\Form\Type\AdCountryFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class NewAdFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\BigBanner
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
            ->add('bannerUrl', 'url', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('credits', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
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
            'data_class' => 'Bux\AdvertiseBundle\Entity\BigBannerAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_big_banner_ad_form_type';
    }
}