<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 1:10 PM
 */

namespace Bux\AdvertiseBundle\Form\Type\Banner;

use Bux\AccountBundle\Form\Type\Ads\AdMembershipFormType;
use Bux\AdvertiseBundle\Form\Type\AdCountryFormType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class BannerAdFormType
 *
 * @package Bux\AdvertiseBundle\Form\Type\Banner
 */
class BannerAdFormType extends AbstractType
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
            ->add('targetUrl', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('bannerUrl', 'text', array(
                'constraints' => array(
                    new NotBlank()
                )
            ))
            ->add('terms', 'checkbox', array(
                'mapped'  => false,
                'required'  => true
            ))
            ->add('memberships', new AdMembershipFormType(), array(
                'required'  => false
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
            'data_class' => 'Bux\AdvertiseBundle\Entity\BannerAd',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'new_banner_ad_form_type';
    }
}